import { Button, TextField } from '@material-ui/core';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createPost, updatePost } from '../redux/actions/postclassAction';
import { imageShow, videoShow } from '../utils/mediaShow';

const PostclassModal = () => {
  const { auth, status_postclass, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [content, setContent] = useState('');
  const [images, setImages] = useState([]);
  const handleChangeImages = (e) => {
    const files = [...e.target.files];
    let err = '';
    let newImages = [];
    files.forEach((file) => {
      if (!file) return (err = 'Tập Tin Không Tồn Tại.');
      if (file.size > 1024 * 1024 * 10) {
        return (err = 'Dung Lượng Tối Đa 10mb.');
      }
      return newImages.push(file);
    });
    if (err) dispatch({ type: GLOBALTYPES.ALERT, payload: { error: err } });
    setImages([...images, ...newImages]);
  };
  const deleteImages = (index) => {
    const newArr = [...images];
    newArr.splice(index, 1);
    setImages(newArr);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // if (images.length === 0)
    //   return dispatch({
    //     type: GLOBALTYPES.ALERT,
    //     payload: { error: 'Vui lòng thêm ảnh của bạn.' },
    //   });

    if (status_postclass.onEdit) {
      dispatch(updatePost({ content, images, auth, status_postclass }));
    } else {
      dispatch(createPost({ content, images, auth, socket }));
    }

    setContent('');
    setImages([]);
    dispatch({ type: GLOBALTYPES.STATUS_POSTCLASS, payload: false });
  };

  useEffect(() => {
    if (status_postclass.onEdit) {
      setContent(status_postclass.content);
      setImages(status_postclass.images);
    }
  }, [status_postclass]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 style={{ marginLeft: '41%' }}>Tạo bài đăng</h5>

          <button
            className="btn btn_close"
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS_POSTCLASS,
                payload: false,
              })
            }
          >
            &times;
          </button>
        </div>
        <div className="status_body">
          <TextField
            id="filled-multiline-flexible"
            multiline
            label="Thông báo nội dung nào đó cho lớp học của bạn"
            variant="filled"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <div className="main__buttons">
            <input
              onChange={handleChangeImages}
              variant="outlined"
              color="primary"
              type="file"
            />
            <div className="show_images">
              {images.map((img, index) => (
                <div key={index} id="file_img">
                  {img.camera ? (
                    imageShow(img.camera)
                  ) : img.url ? (
                    <>
                      {img.url.match(/video/i)
                        ? videoShow(img.url)
                        : imageShow(img.url)}
                    </>
                  ) : (
                    <>
                      {img.type.match(/video/i)
                        ? videoShow(URL.createObjectURL(img))
                        : imageShow(URL.createObjectURL(img))}
                    </>
                  )}
                  <span
                    className="material-icons"
                    onClick={() => deleteImages(index)}
                  >
                    delete_outline
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className="status_footer">
            {/* <div className="input_images w-50">
              <div className="file_upload ">
                <button className="btn btn-warning w-100" type="submit">
                  <input
                    type="file"
                    name="file"
                    id="file"
                    multiple
                    accept="image/*,video/*"
                    onChange={handleChangeImages}
                  />
                  Chọn ảnh
                </button>
              </div>
            </div> */}
            {/* <div className="status_footer w-50">
              <button className="btn btn-warning w-100" type="submit">
                Đăng bài
              </button>
            </div> */}
            <div className="main__footer">
              {' '}
              <div className="main__footer-btn">
                {' '}
                <Button
                  onClick={() =>
                    dispatch({ type: GLOBALTYPES.STATUS_POST, payload: false })
                  }
                >
                  Hủy
                </Button>
                <Button
                  onClick={handleSubmit}
                  color="primary"
                  variant="contained"
                >
                  Đăng
                </Button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default PostclassModal;
