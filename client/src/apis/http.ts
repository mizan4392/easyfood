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
