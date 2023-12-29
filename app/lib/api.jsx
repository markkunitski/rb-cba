"use client";
export const MY_API = "https://rnb-scripts-test.lm.r.appspot.com";
export const MAIN_INFO =
  "https://rnb-scripts-test.lm.r.appspot.com/api/mainInfo";
export const YIELD_INFO =
  "https://rnb-scripts-test.lm.r.appspot.com/api/yldinfo";
export const YIELD_INFO_ALL =
  "https://rnb-scripts-test.lm.r.appspot.com/api/yldInfoAll";
export const LOAD_DETAILS =
  "https://rnb-scripts-test.lm.r.appspot.com/api/loadDetails";
export const GET_DOCS = "https://rnb-scripts-test.lm.r.appspot.com/api/getDocs";
export const GET_REQUESTS =
  "https://rnb-scripts-test.lm.r.appspot.com/api/getRequests";
export const CREATE_REQUEST =
  "https://rnb-scripts-test.lm.r.appspot.com/api/createRequest";
export const UPDATE_REQUEST =
  "https://rnb-scripts-test.lm.r.appspot.com/api/updateRequest";
export const DELETE_REQUEST =
  "https://rnb-scripts-test.lm.r.appspot.com/api/deleteRequest";
export const DELETE_DOC =
  "https://rnb-scripts-test.lm.r.appspot.com/api/deleteDoc";
export const CREATE_DOC =
  "https://rnb-scripts-test.lm.r.appspot.com/api/createDoc";
import { useEffect, useState } from "react";

export const useApi = (
  method,
  url,
  customHeaders = null,
  body = null,
  dependencies = []
) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method,
        };

        if (body) {
          options.body = JSON.stringify(body);
        }

        const headers = {
          "Content-Type": "application/json",
          ...(customHeaders || {}), // Include custom headers if provided
        };

        options.headers = headers;
        console.log(headers);
        const res = await fetch(url, options);
        const responseData = await res.json();
        setData(responseData);
        setLoading(false);
      } catch (err) {
        setError(err);
        setLoading(false);
      }
    };

    fetchData();
  }, dependencies);

  return { data, loading, error };
};
