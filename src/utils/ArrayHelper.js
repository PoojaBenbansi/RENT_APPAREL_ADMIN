export const modifyUserObject = (users) => {
  return users.map((item) => {
    return {
      name: `${item.firstname} ${item.lastname}`,
      email_verified: item.email_verified === 1 ? true : false,
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

export const modifyCategoryObject = (categories) => {
  return categories.map((item) => {
    return {
      name: item.name,
      parentCategory: item.parentCategory?.name ? item.parentCategory?.name : '',
      parentCategoryId: item.parentCategory?._id ? item.parentCategory?._id : '',
      isActive: item.isActive === 1 ? true : false,
      isDeleted: item.isDeleted,
      id: item._id,
    };
  });
};

export const modifyVendorObject = (vendors) => {
  return vendors.map((item) => {
    return {
      name: item.name,
      email: item.email,
      phone: item.phone,
      city: item.address.city.name,
      state: item.address.state.name,
      description: item.description,
      openDays: item.openDays,
      closeTime: item.closeTime,
      openTime: item.openTime,
      isActive: item.isActive === 1 ? true : false,
      isDeleted: item.isDeleted,
      id: item._id,
    };
  });
};
