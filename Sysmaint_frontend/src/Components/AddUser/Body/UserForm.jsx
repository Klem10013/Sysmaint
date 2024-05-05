import React, {useState} from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import {
    Form,
    Button,
    FloatingLabel,
    FormControl,
    OverlayTrigger,
    Tooltip,
    Container,
    Row,
    DropdownButton,
    Dropdown
} from 'react-bootstrap';
import {useCookies} from "react-cookie";
import {useNavigate} from "react-router-dom";
import "./Userinfo.css"


const UserForm = ({onAddProduct}) => {
    const Privilege = [
        'Manager',
        'Worker'
    ];
    const history = useNavigate();
    const redirectToPageUserAdd = () => {
        history('/add_user_page'); // Redirects to the '/login' route
    };

    const [name, setName] = useState('');
    const [address, setAddress] = useState('');
    const [privilege, setPrivilege] = useState(Privilege[1]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [cookies, setCookie, removeCookie] = useCookies(['user'])

    const handleCategorySelect = (selectedCategory) => {
        setPrivilege(selectedCategory);
        setShowDropdown(false);
    };


    const handleSubmit = (e) => {
        e.preventDefault();

        const user = {
            username: cookies.user.name,
            company: cookies.user.id_company,
            token: cookies.user.token
        }

        fetch("http://localhost:3001/client/add", {
            method: "POST",
            headers: { "Content-type": "application/json" },
            body: JSON.stringify({
                name: user.username,
                token: user.token,
                id_company: user.company,

                name_add : name,
                address_add : address,
                privilege_add : Privilege.findIndex((pri) => pri === privilege)+2,
                id_company_add : user.company
            })
        }).then((response) => {
            if (response.ok)
            {
                setName('');
                setAddress('');
                setPrivilege(Privilege[1]);
            }
            else
            {
                console.log(response.json())
            }
        })
    };

    return (
        <Container>
            <Row>
                <Form onSubmit={handleSubmit}>
                    <Form.Group className="mb-3" controlId="name">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="Email">
                        <Form.Label>User Address mail</Form.Label>
                        <Form.Control
                            type="text"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="category">
                        <Form.Label className="custom-form-label">User privilege</Form.Label>
                        <DropdownButton
                            className={"custom-dropdown-btn"}
                            style={{padding:0}}
                            alignRight
                            title={privilege}
                            id="dropdown-menu-align-right"
                            onSelect={(selectedCategory) => handleCategorySelect(selectedCategory)}
                        >
                            {Privilege.map((cat) => (
                                <Dropdown.Item key={cat} eventKey={cat}>
                                    {cat}
                                </Dropdown.Item>
                            ))}
                        </DropdownButton>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Add Product
                    </Button>
                </Form>
            </Row>
        </Container>

    );
};

export default UserForm