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
    getData();
  }, []);

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((data) => ({
      ...data,
      [e.target.id]: e.target.value,
    }));
  };

  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `https://api.giphy.com/v1/gifs/search?api_key=SiWLd2c7lWedjOXrjYFWdq3ACGuNCxA3&q=${
          formData.search || "popular"
        }&limit=9&offset=0&rating=g&lang=en&bundle=messaging_non_clips`
      );

      const body = response.data.data;
      setData(body);
      setFormData(defaultFormData);
    } catch (error) {}
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
        {data?.length !== 0 ? (
          data ? (
            data.map((item, index) => (
              <figure key={index}>
                <p>GIF</p>
                <img src={item.images.original.url} alt={item.title} />
              </figure>
            ))
          ) : (
            <div className="information">
              <h1>loading...</h1>
            </div>
          )
        ) : (
          <div className="information">
            <h1>data not found</h1>
          </div>
        )}
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
