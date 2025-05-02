function ErrorHandle({ errorHandle }) {
  return (
    <div>
      {errorHandle ? 
        <h1>Server error, please try again</h1> : <h1>Page not Found</h1>  }
      
    </div>
  );
}

export default ErrorHandle;
