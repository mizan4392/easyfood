export const postHeader = (data: unknown, accessToken: string) => {
  return {
    method: "POST",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export const postDataAndFileHeader = (
  data: FormData,
  accessToken: string,
  method: "POST" | "PATCH"
) => {
  return {
    method: method,
    headers: {
      Authorization: `Bearer ${accessToken}`,
    },
    body: data,
  };
};

export const updateHeader = (data: unknown, accessToken: string) => {
  return {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
};

export const getHeader = (accessToken: string) => {
  return {
    method: "GET",
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
    },
  };
};
