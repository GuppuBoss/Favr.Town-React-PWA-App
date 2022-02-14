import './tagCloud.module.scss';

import PropTypes from 'prop-types';
import React from 'react';
import { TagCloud } from 'react-tagcloud';
// const customRenderer = (tag, size, color) => {
//   return (
//     <span key={tag.value} className={`tag-${size}`} style={{ color }}>
//       {tag.value}
//     </span>
//   );
// };

const TagCloudWrapper = ({ data, ...props }) => {
  return <TagCloud tags={data} {...props} />;
};

TagCloudWrapper.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  data: PropTypes.any.isRequired,
};

export default TagCloudWrapper;
