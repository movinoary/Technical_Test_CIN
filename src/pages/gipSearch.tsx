import { useEffect, useState } from "react";
import axios from "axios";

export type Data = {
  images: {
    original: {
      url: string;
    };
  };
  title: string;
};

const GipSearch = () => {
  const [data, setData] = useState<Data[] | null>();

  const getData = async (value: string) => {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=SiWLd2c7lWedjOXrjYFWdq3ACGuNCxA3&q=${
        value || "popular"
      }&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );

    const body = response.data.data;
    setData(body);
  };

  const onChange = (e: { target: { value: string } }) => {
    setTimeout(() => getData(e.target.value), 2000);
  };

  useEffect(() => {
    getData("popular");
  }, []);

  return (
    <section className="page-content">
      <div className="top">
        <h1>search your giphy</h1>
        <input
          type="text"
          placeholder="Search Giphy"
          onChange={(e) => onChange(e)}
        />
      </div>
      <div className="row">
        {data
          ? data.map((item, index) => (
              <figure key={index}>
                <p>GIF</p>
                <img src={item.images.original.url} alt={item.title} />
              </figure>
            ))
          : null}
      </div>
    </section>
  );
};

export default GipSearch;
