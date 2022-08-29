import React, { useState, useEffect } from "react";
import { announcements } from "../../data/announcements";
const Announcements = () => {
  const [news, setNews] = useState(announcements);
  const [index, setIndex] = React.useState(0);

  useEffect(() => {
    const lastIndex = news.length - 1;
    if (index < 0) {
      setIndex(lastIndex);
    }
    if (index > lastIndex) {
      setIndex(0);
    }
  }, [index, news]);

  useEffect(() => {
    let slider = setInterval(() => {
      setIndex(index + 1);
    }, 5000);
    return () => {
      clearInterval(slider);
    };
  }, [index]);

  return (
    <div className="section-center">
      {news.map((news, newsIndex) => {
        const { id, title } = news;

        let position = "nextSlide";
        if (newsIndex === index) {
          position = "activeSlide";
        }
        if (
          newsIndex === index - 1 ||
          (index === 0 && newsIndex === news.length - 1)
        ) {
          position = "lastSlide";
        }

        return (
          <article className={position} key={id}>
            <p className="text">{title}</p>
          </article>
        );
      })}
    </div>
  );
};

export default Announcements;
