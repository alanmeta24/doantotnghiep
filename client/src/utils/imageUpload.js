export const checkImage = (file) => {
  let err = '';
  if (!file) return (err = 'Không tìm thấy tập tin.');

  if (file.size > 1024 * 1024 * 2)
    // 1mb
    err = 'Dung lượng tối đa 2mb.';

  if (file.type !== 'image/jpeg' && file.type !== 'image/png')
    err = 'Định dạng không được hỗ trợ.';

  return err;
};

export const imageUpload = async (images) => {
  let imgArr = [];
  for (const item of images) {
    const formData = new FormData();

    if (item.camera) {
      formData.append('file', item.camera);
    } else {
      formData.append('file', item);
    }

    formData.append('upload_preset', 'j9oyl7cg');
    formData.append('cloud_name', 'buivantan');

    const res = await fetch(
      'https://api.cloudinary.com/v1_1/buivantan/upload',
      {
        method: 'POST',
        body: formData,
      },
    );

    const data = await res.json();
    imgArr.push({ public_id: data.public_id, url: data.secure_url });
  }
  return imgArr;
};
