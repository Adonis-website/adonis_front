import Head from 'next/head';
import DefaultLayout from '@/layouts/DefaultLayout';
import HomepageFilterButtons from '@/components/HomepageFilterButtons';
import HomepageSqueletons from '@/components/HomepageSqueletons';
import { useEffect, useState } from 'react';
import getContentByCategory from '@/Axios/getContentByCategory';
import GetPopularContentAxios from '@/Axios/GetPopularContentAxios';
import GetNewContentAxios from '@/Axios/GetNewContentAxios';

export default function Home() {
  const [contentDisplayed, setContentDisplayed] = useState<any>(null);
  const [contentChosen, setContentChosen] = useState<any>(null);
  const [popularContent, setPopularContent] = useState<any>(null);
  const [newContent, setNewContent] = useState<any>(null);
  const [books, setBooks] = useState<any>(null);
  const [videos, setVideos] = useState<any>(null);
  const [quotes, setQuotes] = useState<any>(null);

  useEffect(() => {
    if (!contentChosen) {
      filterContent('popular');
    }
  }, []);

  const getPopularContent = async () => {
    if (popularContent) {
      setContentDisplayed(popularContent);
    } else {
      const popularContent = await GetPopularContentAxios();
      setContentDisplayed(popularContent);
      setPopularContent(popularContent);
    }
  };

  const getNewContent = async () => {
    if (newContent) {
      setNewContent(newContent);
    } else {
      const newContent = await GetNewContentAxios();
      setContentDisplayed(newContent);
      setNewContent(newContent);
    }
  };

  const getBooks = async () => {
    if (books) {
      setContentDisplayed(books);
    } else {
      const booksMapping = await getContentByCategory('book');
      setContentDisplayed(booksMapping);
      setBooks(booksMapping);
    }
  };

  const getQuotes = async () => {
    if (quotes) {
      setContentDisplayed(quotes);
    } else {
      const quotesMapping = await getContentByCategory('quote');
      setContentDisplayed(quotesMapping);
      setQuotes(quotesMapping);
    }
  };

  const getVideos = async () => {
    if (videos) {
      setContentDisplayed(videos);
    } else {
      const videosMapping = await getContentByCategory('video');
      setContentDisplayed(videosMapping);
      setVideos(videosMapping);
    }
  };

  // Getting the Right Content
  function filterContent(contentChosen: string) {
    setContentChosen(contentChosen);
    switch (contentChosen) {
      case 'popularContent':
        return getPopularContent();
      case 'newContent':
        return getNewContent();
      case 'book':
        return getBooks();
      case 'quote':
        return getQuotes();
      case 'video':
        return getVideos();
    }
  }

  return (
    <>
      <Head>
        <title>Homepage</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <DefaultLayout>
          <div className="flex justify-center">
            <div className="flex-col">
              <HomepageFilterButtons filterContent={filterContent} />
              <div className="-mt-10">
                {contentDisplayed ? contentDisplayed : <HomepageSqueletons />}
              </div>
            </div>
          </div>
        </DefaultLayout>
      </main>
    </>
  );
}
