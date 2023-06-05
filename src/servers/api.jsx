import axios from 'axios';

axios.defaults.baseURL = 'https://6477bd54362560649a2ceb8d.mockapi.io';

export const fetchUsers = async page => {
  const params = {
    limit: 3,
    page: page,
  };

  const response = await axios.get(`/users`, { params });
  console.log(response);
  return response.data;
};

export const fetchUpdatedFollowers = async (user, updatedFollowers) => {
  const data = {
    followers: updatedFollowers,
    isFollowing: !user.isFollowing,
  };

  const response = await axios.put(`/users/${user.id}`, data);
  return response.data;
};
