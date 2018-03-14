const validate = values => {
    const errors = {}
    if (!values.title) {
      errors.title = 'Required'
    }
    if (!values.pages || !values.pages.length) {
      errors.pages = { _error: 'At least one page must be entered' }
    } else {
      const pagesArrayErrors = []
      values.pages.forEach((page, pageIndex) => {
        const pageErrors = {}
        if (!page || !page.url) {
          pageErrors.url = 'Required'
          pagesArrayErrors[pageIndex] = pageErrors
        }            
      });
      if (pagesArrayErrors.length) {
        errors.pages = pagesArrayErrors
      }
      if (values.pages.length > 5) {
        errors.pages = { _error: 'No more than five values allowed' }
      }
    }
    return errors
  }
  
  export default validate;