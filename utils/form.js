const createFormData = (photo, body = {}) => {
  const data = new FormData();
  console.log('--------------------------')
  console.log(JSON.stringify(photo))
  data.append('image', {
    name: photo.fileName,
    type: photo.type,
    uri: Platform.OS === 'ios' ? photo.uri.replace('file://', '') : photo.uri,
  });

  Object.keys(body).forEach((key) => {
    data.append(key, body[key]);
  });

  return data;
};

export {createFormData};