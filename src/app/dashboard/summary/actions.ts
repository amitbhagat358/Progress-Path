'use server';

import { SummaryDataFromServer } from './interfaces';

export const fetchSummaryData = async (date: string) => {
  try {
    const res = await fetch(`http://localhost:3000/api/summary?date=${date}`);

    if (res.redirected) {
      return { redirected: res.redirected, url: res.url };
    }

    if (!res.ok) {
      throw new Error(`HTTP Error: ${res.status}`);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return null;
  }
};

export const postSummaryData = async (
  date: string | null,
  data: SummaryDataFromServer
) => {
  try {
    const res = await fetch(`http://localhost:3000/api/summary?date=${date}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      throw new Error('Failed to save data');
    }

    const resData = await res.json();
    return resData;
  } catch (error) {
    console.error('Error posting data: ', error);
    return null;
  }
};
