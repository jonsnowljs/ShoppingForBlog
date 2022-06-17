import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('');

  const submitHandler = (e) => {
    e.preventDefault();
    // keyword.trim removes whitespace from both ends of a string and returns a new string, without modifying the original string
    //if keyword is empty push to home page.
    if (keyword.trim()) {
      history.push(`/search/${keyword}`);
    } else {
      history.push('/');
    }
  };

  return (
    <Form onSubmit={submitHandler} className="d-flex ">
      <Form.Control
        type="text"
        name="q"
        onChange={(e) => setKeyword(e.target.value)}
        placeholder="Search Products"
        className="mr-sm-2 ml-sm-6"
      ></Form.Control>
      <Button type="submit" variant="outline-info" className="ml-4 px-6">
        Search
      </Button>
    </Form>
  );
};

export default SearchBox;
