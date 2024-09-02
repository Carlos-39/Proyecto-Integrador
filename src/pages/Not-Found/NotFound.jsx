import './NotFound.css'

/**
 	* NotFound component to display a 404 error message
 	* when the user navigates to a non-existent URL.
 	*
 	* @component
 	* @returns {JSX.Element} The rendered NotFound component.
 */
const NotFound = () => {
	return (
		<>
			<div className="container-E404">
    			<h1>We couldn&apos;t find the page you were looking for</h1>
  			</div>;
		</>
	)
}

export default NotFound