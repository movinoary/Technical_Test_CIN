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

const GipIronMan = () => {
  const [data, setData] = useState<Data[] | null>();

  const getData = async () => {
    const response = await axios.get(
      "https://api.giphy.com/v1/gifs/search?api_key=SiWLd2c7lWedjOXrjYFWdq3ACGuNCxA3&q=iron+man&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips"
    );

    const body = response.data.data;

    setData(body);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <section className="page-content">
      <div className="top">
        <h1>iron man giphy</h1>
      </div>
      <div className="row">
        {data
          ? data.map((item, index) => (
              <figure key={index}>
                <img src={item.images.original.url} alt={item.title} />
              </figure>
            ))
          : null}
      </div>
    </section>
  );
};

export default GipIronMan;
