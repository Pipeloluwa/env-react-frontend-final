const deleteCookie = (name) => {
    const expirationDate = new Date(0); // Set expiration date to the past
    document.cookie = `${name}=; expires=${expirationDate.toUTCString()}; path=/`;
  };

export const handleDeleteCookie = () => {
    // Delete the "exampleCookie" cookie
    deleteCookie('access_token');
};
