import { useEffect, useState } from 'react';
import { Button, TextField } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { GLOBALTYPES } from '../redux/actions/globalTypes';
import { createPost, updatePost } from '../redux/actions/postAction';
import { imageShow, videoShow } from '../utils/mediaShow';
import Icons from './Icons';

const StatusModal = () => {
  const { auth, status, socket } = useSelector((state) => state);
  const dispatch = useDispatch();

  const [title, setTitle] = useState('');
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
    if (images.length === 0)
      return dispatch({
        type: GLOBALTYPES.ALERT,
        payload: { error: 'Vui lòng thêm ảnh của bạn.' },
      });

    if (status.onEdit) {
      dispatch(updatePost({ title, content, images, auth, status }));
    } else {
      dispatch(createPost({ title, content, images, auth, socket }));
    }

    setTitle('');
    setContent('');
    setImages([]);
    dispatch({ type: GLOBALTYPES.STATUS, payload: false });
  };

  useEffect(() => {
    if (status.onEdit) {
      setTitle(status.title);
      setContent(status.content);
      setImages(status.images);
    }
  }, [status]);

  return (
    <div className="status_modal">
      <form onSubmit={handleSubmit}>
        <div className="status_header">
          <h5 style={{ marginLeft: '178px' }}>Tạo bài viết mới</h5>

          <button
            className="btn btn_close"
            onClick={() =>
              dispatch({
                type: GLOBALTYPES.STATUS,
                payload: false,
              })
            }
          >
            &times;
          </button>
        </div>

        <div className="status_body">
          <div className="wrap">
            {/* <textarea
              name="content"
              value={content}
              placeholder={`${auth.user.username} ơi, bạn đang nghĩ gì thế?`}
              onChange={(e) => setContent(e.target.value)}
            /> */}
            <TextField
              id="filled-basic"
              label="Tiêu đề (bắt buộc)"
              className="form__input"
              variant="filled"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <TextField
              id="filled-multiline-flexible"
              multiline
              label="Nhập nội dung (bắt buộc)"
              variant="filled"
              value={content}
              onChange={(e) => setContent(e.target.value)}
            />

            {/* <div className="d-flex">
              <div className="flex-fill"></div>
              <Icons setContent={setContent} content={content} />
            </div> */}
          </div>

          <div className="show_images">
            {images.map((img, index) => (
              <div key={index} id="file_img">
                {img.url ? (
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
                <span onClick={() => deleteImages(index)}>&times;</span>
              </div>
            ))}
          </div>

          <div className="status_footer">
            <div className="input_images w-50">
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
                  Tải lên
                </button>
              </div>
            </div>
            <div className="status_footer w-50">
              <button className="btn btn-warning w-100" type="submit">
                Đăng bài
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default StatusModal;
