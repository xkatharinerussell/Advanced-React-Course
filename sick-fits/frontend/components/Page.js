import PropTypes from 'prop-types';

// Destructure props to reference them directly
export default function Page({ children }) {
  return (
    <div>
      <h1> I am the best component</h1>
      {children}
    </div>
  );
}

Page.propTypes = {
  children: PropTypes.node || PropTypes.arrayOf(PropTypes.node),
};
