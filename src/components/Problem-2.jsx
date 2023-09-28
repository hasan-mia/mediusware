import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

const Problem2 = () => {
  const [modalTitle, setModalTitle] = useState('');
  const [showModalA, setShowModalA] = useState(false);
  const [showModalB, setShowModalB] = useState(false);
  const [showModalC, setShowModalC] = useState(false);
  const [onlyEven, setOnlyEven] = useState(false);
  const [contactsA, setContactsA] = useState([]);
  const [contactsB, setContactsB] = useState([]);
  const [filteredA, setFilteredA] = useState([]);
  const [filteredB, setFilteredB] = useState([]);
  const [searchA, setSearchA] = useState('');
  const [searchB, setSearchB] = useState('');
  const [currentPageA, setCurrentPageA] = useState(1);
  const [currentPageB, setCurrentPageB] = useState(1);
  const [perPage, setPerPage] = useState(10);

  // Function to fetch contacts
    // const fetchContactsA = async () => {
    //     let apiUrl = `https://contact.mediusware.com/api/contacts/?search=${searchTerm}&page=${page}&page_size=${perPage}`;
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     setContactsA([data.results]);
    // };

    // const fetchContactsB =  () => {
    //     let apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20States/?page=1&page_size=10`;
    //     const response = await fetch(apiUrl);
    //     const data = await response.json();
    //     setContactsB([data.results]);
    // };

  // Load contacts Modal A
  const loadContactsA = async () => {
    let apiUrl = `https://contact.mediusware.com/api/contacts/?search=${searchA}&page=${currentPageA}&page_size=${perPage}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    console.log(data);
    setContactsA([...contactsA, ...data.results]);
    setCurrentPageA(currentPageA + 1);
  };

  // Load contacts Modal B
  const loadContactsB = async () => {
    let apiUrl = `https://contact.mediusware.com/api/country-contacts/United%20States/?page=${currentPageB}&page_size=${perPage}`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    setContactsB([...contactsB, ...data.results]);
    setCurrentPageB(currentPageB + 1);
  };

  // Open Modal A
  const openModalA = () => {
    setModalTitle('All Contacts');
    setShowModalA(true);
    setCurrentPageA(1); 
    setContactsA([]);
    loadContactsA();
  };

  // Open Modal B
  const openModalB = () => {
    setModalTitle('US Contacts');
    setShowModalB(true);
    setCurrentPageB(1);
    setCurrentPageB([]);
    loadContactsB();
  };

  // Open Modal C (Contact Details)
  const openModalC = () => {
    setShowModalC(true);
  };

  // Close Modals A, B, and C
  const handleCloseModals = () => {
    setShowModalA(false);
    setShowModalB(false);
    setShowModalC(false);
  };

// // Handle filtering contactsA based on search term and even/odd filter
//   useEffect(() => {
//     const filtered = contactsA?.filter((contact) => {
//       if (onlyEven && contact?.id % 2 === 1) {
//         return false;
//       }
//       return contact?.name?.toLowerCase()?.includes(searchA?.toLowerCase());
//     });
//     setFilteredB(filtered);
//   }, [contactsA, setFilteredB, onlyEven, searchA]);

//   // Handle filtering contacts based on search term and even/odd filter
//   useEffect(() => {
//     const filtered = contactsB?.filter((contact) => {
//       if (onlyEven && contact?.id % 2 === 1) {
//         return false;
//       }
//       return contact?.name?.toLowerCase()?.includes(searchB?.toLowerCase());
//     });
//     setContactsB(filtered);
//   }, [contactsB, setContactsB, onlyEven, searchB]);

  useEffect(() => {
    // Add event listeners for infinite scrolling
    const handleScroll = () => {
      if (
        window.innerHeight + window.scrollY >= document.body.offsetHeight &&
        (showModalA || showModalB)
      ) {
        if (showModalA) loadContactsA();
        if (showModalB) loadContactsB();
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [showModalA, showModalB]);

  return (
    <div className="container">
      <div className="row justify-content-center mt-5">
        <h4 className="text-center text-uppercase mb-5">Problem-2</h4>

        <div className="d-flex justify-content-center gap-3">
          <button
            className="btn btn-lg btn-outline-primary"
            type="button"
            onClick={openModalA}
          >
            All Contacts
          </button>
          <button
            className="btn btn-lg btn-outline-warning"
            type="button"
            onClick={openModalB}
          >
            US Contacts
          </button>
        </div>
      </div>

      {/* Modal A (All Contacts) */}
      <Modal show={showModalA} onHide={handleCloseModals} centered>
        <Modal.Header closeButton>
          <Modal.Title>All Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchA">
            <Form.Control
              type="text"
              placeholder="Search Contacts"
              value={searchA}
              onChange={(e) => setSearchA(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
            />
          <ul>
            { filteredA?.length <= 0 ? contactsA?.map((contact) => (
              <li
                key={contact.id}
                onClick={openModalC}
                style={{ cursor: 'pointer' }}
              >
                 <div className="d-flex justify-content-between">
                    <p>{contact?.country?.name}</p>
                    <p>{contact?.phone}</p>
                </div>
              </li>
            )): filteredA?.map((contact) => (
              <li
                key={contact.id}
                onClick={openModalC}
                style={{ cursor: 'pointer' }}
              >
                 <div className="d-flex justify-content-between">
                    <p>{contact?.country?.name}</p>
                    <p>{contact?.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={openModalA}>
            Modal Button A
          </Button>
          <Button variant="warning" onClick={openModalB}>
            Modal Button B
          </Button>
          <Button variant="secondary" onClick={handleCloseModals}>
            Modal Button C
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal B (US Contacts) */}
      <Modal show={showModalB} onHide={handleCloseModals} centered>
        <Modal.Header closeButton>
          <Modal.Title>US Contacts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="searchB">
            <Form.Control
              type="text"
              placeholder="Search Contacts"
              value={searchB}
              onChange={(e) => setSearchB(e.target.value)}
            />
          </Form.Group>
          <Form.Check
            type="checkbox"
            label="Only even"
            checked={onlyEven}
            onChange={() => setOnlyEven(!onlyEven)}
            />
          <ul>
            {contactsB?.map((contact) => (
              <li
                key={contact.id}
                onClick={openModalC}
                style={{ cursor: 'pointer' }}
              >
                <div className="d-flex justify-content-between">
                    <p>{contact?.country?.name}</p>
                    <p>{contact?.phone}</p>
                </div>
              </li>
            ))}
          </ul>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={openModalA}>
            Modal Button A
          </Button>
          <Button variant="warning" onClick={openModalB}>
            Modal Button B
          </Button>
          <Button variant="secondary" onClick={handleCloseModals}>
            Modal Button C
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal C (Contact Details) */}
      <Modal show={showModalC} onHide={handleCloseModals} centered>
        <Modal.Header closeButton>
          <Modal.Title>Contact Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* Display contact details here */}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseModals}>
            Modal Button C
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default Problem2;
