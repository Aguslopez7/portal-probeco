import { useMediaQuery } from 'react-responsive';

const useResponsive = () => {
  const isMobile = useMediaQuery({ query: 'maxWidth: 767' }); // Less than 768px
  const isTablet = useMediaQuery({ query: 'minWidth: 768 and maxWidth: 1024' }); // 768px to 1024px
  const isDesktop = useMediaQuery({ query: '(min-width: 1025px)' }); // Greater than 1024px
  const isSmallDevice = useMediaQuery({ query: '(max-width: 992px)'})
  
  return { isMobile, isTablet, isDesktop, isSmallDevice };
};

export default useResponsive;
