export const modifyUserObject = (users) => {
  return users.map((item) => {
    return {
      name: `${item.firstname} ${item.lastname}`,
      email_verified: item.email_verified === 1 ? 'True' : 'False',
      isActive: item.isActive === 1 ? true : false,
      isDeleted: item.isDeleted,
      id: item._id,
      email: item.email,
      contact: item.contact,
      state: item.state.name,
      city: item.city.name,
      pincode: item.pincode,
      address: item.address,
    };
  });
};
