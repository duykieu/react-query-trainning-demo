// @ts-nocheck
import _ from 'lodash';
import cls from 'classnames';
import { Modal } from 'antd';
export * from './regexs';

export { cls };

export function toCamelCase<T, TResult>(obj: T): TResult {
  return _.transform<T, TResult>(obj, (acc, value, key, target) => {
    const camelKey = _.isArray(target) ? key : _.camelCase(key);

    acc[camelKey] = _.isObject(value) ? toCamelCase(value) : value;
  });
}

export const toSnakeCase = (obj) => {
  return _.transform(obj, (acc, value, key, target) => {
    const snakeCase = _.isArray(target) ? key : _.snakeCase(key);

    acc[snakeCase] = _.isObject(value) ? toSnakeCase(value) : value;
  });
};

export const makeSlug = (text: string): string => {
  // Đổi chữ hoa thành chữ thường
  let slug = text.toLowerCase();

  // Đổi ký tự có dấu thành không dấu
  slug = slug.replace(/á|à|ả|ạ|ã|ă|ắ|ằ|ẳ|ẵ|ặ|â|ấ|ầ|ẩ|ẫ|ậ/gi, 'a');
  slug = slug.replace(/é|è|ẻ|ẽ|ẹ|ê|ế|ề|ể|ễ|ệ/gi, 'e');
  slug = slug.replace(/i|í|ì|ỉ|ĩ|ị/gi, 'i');
  slug = slug.replace(/ó|ò|ỏ|õ|ọ|ô|ố|ồ|ổ|ỗ|ộ|ơ|ớ|ờ|ở|ỡ|ợ/gi, 'o');
  slug = slug.replace(/ú|ù|ủ|ũ|ụ|ư|ứ|ừ|ử|ữ|ự/gi, 'u');
  slug = slug.replace(/ý|ỳ|ỷ|ỹ|ỵ/gi, 'y');
  slug = slug.replace(/đ/gi, 'd');
  // Xóa các ký tự đặt biệt
  slug = slug.replace(
    /\`|\~|\!|\@|\#|\||\$|%|\^|\&|\*|\(|\)|\+|\=|\,|\.|\/|\?|\>|\<|\'|\"|\:|\;|_/gi,
    '',
  );
  // Đổi khoảng trắng thành ký tự gạch ngang
  slug = slug.replace(/ /gi, '-');
  // Đổi nhiều ký tự gạch ngang liên tiếp thành 1 ký tự gạch ngang
  // Phòng trường hợp người nhập vào quá nhiều ký tự trắng
  slug = slug.replace(/\-\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-\-/gi, '-');
  slug = slug.replace(/\-\-\-/gi, '-');
  slug = slug.replace(/\-\-/gi, '-');
  // Xóa các ký tự gạch ngang ở đầu và cuối
  slug = '@' + slug + '@';
  slug = slug.replace(/\@\-|\-\@|\@/gi, '');
  // In slug ra textbox có id “slug”
  return slug;
};

export const confirmDelete = (onOk) => {
  Modal.confirm({
    title: 'Xác nhận',
    content: 'Bạn chắc muốn xóa đối tượng này chứ',
    onOk: onOk,
  });
};
