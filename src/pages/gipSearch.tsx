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

const defaultFormData = {
  search: "",
};

const GipSearch = () => {
  const [data, setData] = useState<Data[] | null>();
  const [formData, setFormData] = useState(defaultFormData);
  const { search } = formData;

  const getData = async () => {
    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=SiWLd2c7lWedjOXrjYFWdq3ACGuNCxA3&q=random&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );

    const body = response.data.data;
    setData(body);
  };

  useEffect(() => {
    console.log("Component Mounted");
    getData();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const response = await axios.get(
      `https://api.giphy.com/v1/gifs/search?api_key=SiWLd2c7lWedjOXrjYFWdq3ACGuNCxA3&q=${
        formData.search || "popular"
      }&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
    );

    const body = response.data.data;
    setData(body);

    setFormData(defaultFormData);
  };

  return (
    <section className="page-content">
      <div className="top">
        <h1>search your giphy</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            id="search"
            value={search}
            placeholder="Search Giphy"
            onChange={(e) => onChange(e)}
          />
        </form>
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
        {/* {dataUpdate
          ? dataUpdate.map((item, index) => (
              <figure key={index}>
                <p>GIF</p>
                <img src={item.images.original.url} alt={item.title} />
              </figure>
            ))
          : null} */}
      </div>
    </section>
  );
};

export default GipSearch;
