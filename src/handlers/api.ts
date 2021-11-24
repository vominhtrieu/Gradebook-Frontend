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
      localStorage.removeItem("token");
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
      localStorage.removeItem("token");
    }
    return res.json();
  });
};
