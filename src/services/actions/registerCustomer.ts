"use server";

export const registerCustomer = async (formData: FormData) => {
  const res = await fetch(
    `http://localhost:5000/api/v1/user/create-customer`,
    {
      method: "POST",
      body: formData,
      cache: "no-store",
    }
  );

  const registerCustomer = await res.json();
  return registerCustomer;
};
