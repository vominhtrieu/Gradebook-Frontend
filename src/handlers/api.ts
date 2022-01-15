import { message } from "antd";

export const getData = (url: string): Promise<any> => {
  return fetch(`${process.env.REACT_APP_API_HOST}${url}`, {
    method: "GET",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => {
    if (res.status === 401) {
      message.error("You must login first");
      localStorage.removeItem("token");
    } else if (res.status >= 400) {
      message.error("Something went wrong!!");
    }
    return res.json();
  });
};

export const postData = (url: string, data: any): Promise<any> => {
  return fetch(`${process.env.REACT_APP_API_HOST}${url}`, {
    method: "POST",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => {
    if (res.status === 401) {
      message.error("You must login first");
      localStorage.removeItem("token");
    } else if (res.status >= 400) {
      message.error("Something went wrong!!");
    }
    return res.json();
  });
};

export const deleteData = (url: string, data: any): Promise<any> => {
  return fetch(`${process.env.REACT_APP_API_HOST}${url}`, {
    method: "DELETE",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => {
    if (res.status === 401) {
      message.error("You must login first");
      localStorage.removeItem("token");
    } else if (res.status >= 400) {
      message.error("Something went wrong!!");
    }
    return res.json();
  });
};

export const putData = (url: string, data: any): Promise<any> => {
  return fetch(`${process.env.REACT_APP_API_HOST}${url}`, {
    method: "PUT",
    mode: "cors",
    body: JSON.stringify(data),
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  }).then((res: Response) => {
    if (res.status === 401) {
      message.error("You must login first");
      localStorage.removeItem("token");
    } else if (res.status >= 400) {
      message.error("Something went wrong!!");
    }
    if(!Object.keys(res.json()).length || res.ok){
      return {
        message: "Put data success"
      }
    }
    return res.json();
  });
};
