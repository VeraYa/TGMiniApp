import React, { useEffect, useState } from 'react';

const App = () => {
  const [rates, setRates] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchRates = async () => {
      try {
        // Получение текущей даты
        const today = new Date();
        const day = String(today.getDate()).padStart(2, '0');
        const month = String(today.getMonth() + 1).padStart(2, '0');
        const year = today.getFullYear();
        const formattedDate = `${day}/${month}/${year}`;

        // Запрос к API Центробанка с текущей датой
        const response = await fetch(
          `/scripts/XML_daily.asp?date_req=${formattedDate}`
        );

        // Проверка на наличие данных в ответе
        if (!response.ok) {
          throw new Error('Ошибка при получении данных');
        }

        // Чтение тела ответа как массива байт
        const responseBuffer = await response.arrayBuffer();

        // Декодирование данных с кодировкой windows-1251
        const decoder = new TextDecoder('windows-1251');
        const responseText = decoder.decode(responseBuffer);

        console.log("Response data:", responseText);

        // Парсинг XML-ответа
        const parser = new DOMParser();
        const xml = parser.parseFromString(responseText, 'text/xml');

        // Проверка на ошибки парсинга
        const parseError = xml.getElementsByTagName('parsererror');
        if (parseError.length) {
          throw new Error('Ошибка парсинга XML');
        }

        const currencyElements = xml.getElementsByTagName('Valute');

        // Извлечение данных из XML и сохранение в состояние
        const ratesArray = Array.from(currencyElements).map((el) => {
          return {
            id: el.getElementsByTagName('CharCode')[0].textContent,
            name: el.getElementsByTagName('Name')[0].textContent,
            value: el.getElementsByTagName('Value')[0].textContent,
          };
        });

        console.log("Parsed rates:", ratesArray);

        // Сохранение курсов валют в состояние
        setRates(ratesArray);
      } catch (error) {
        setError('Не удалось загрузить данные');
        console.error("Error fetching or parsing data:", error);
      }
    };

    fetchRates();
  }, []);

  return (
    <div>
      <h1>Курсы валют ЦБ РФ на сегодня</h1>
      {error && <p>{error}</p>}
      <table>
        <thead>
          <tr>
            <th>Код валюты</th>
            <th>Наименование</th>
            <th>Курс</th>
          </tr>
        </thead>
        <tbody>
          {rates.map((rate) => (
            <tr key={rate.id}>
              <td>{rate.id}</td>
              <td>{rate.name}</td>
              <td>{rate.value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default App;