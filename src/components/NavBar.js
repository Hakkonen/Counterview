import React, { useState, useEffect } from "react"
import { Container, Nav, Navbar, Form, NavDropdown, Button } from "react-bootstrap"
import Fetch from "./Fetch"
import AutoComplete from "./AutoComplete";

function NavBar(props) {
    const [ input, setInput ] = useState("")    // Search input box value
    const [ result, setResult ] = useState({asset: "", supply: "0"})  // Fetch results

    // 1. Handles search input
    function handleInput(input) {
        setInput(input)
    }
    function handleChange(e) {
        console.log(e.target.value)
        const string = e.target.value
        setInput(string)
    }

    function handleSubmit(e) {
        e.preventDefault();
    }

    // 2. Receives search input and filters length to determine if asset or address then fetches API data
    const search = async (value) => {

        // If text input is not length of address then search for asset
        if(value.length < 28) {
            setInput(value.toUpperCase())
            const res = await Fetch("asset", value.toUpperCase())
            setResult(res)
        } else {
        // Search an address
            const res = await Fetch("balances", value)
            setResult(res)
        }
    }

    // 3. Updates wallet values when async is complete
    useEffect(() => {
        console.log("RESULT")
        console.log(result)
        // Passes JSON data to parent
        props.onDataChange(result)
    }, [result])
    
    return (
        <Navbar collapseOnSelect className="navBar" expand="lg"variant="dark">
            <Container>
                <Navbar.Brand href="" className="logo">Counterview.club</Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="me-auto">
                    {/* <Nav.Link 
                        className={props.pepeFilter.original ? "selected-filter" : "nav-link"}
                        onClick={() => {
                            props.onFilterChange("original")
                        }}
                    >OG Peps</Nav.Link> */}
                    <NavDropdown title="OG Peps">
                    <NavDropdown.Item>
                        Coming Soon
                    </NavDropdown.Item>
                    </NavDropdown>

                    <Nav.Link 
                        className={props.pepeFilter.fake ? "selected-filter" : "nav-link"}
                        onClick={() => {
                            props.onFilterChange("fake")
                        }}
                    >Fakes</Nav.Link>
                    {/* <Nav.Link 
                        href="https://fapep.github.io/FABRIQUE/"
                        target="_blank"
                    >About</Nav.Link> */}
                    <NavDropdown title="Donate">
                    <NavDropdown.Item nowrap
                            onClick={() => {
                                navigator.clipboard.writeText("1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5")
                            }}
                        >
                            Fabrique
                    </NavDropdown.Item>
                    <NavDropdown.Item nowrap
                            onClick={() => {
                                navigator.clipboard.writeText("1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5")
                            }}
                        >
                            Copy: 1EWFR9dMzM2JtrXeqwVCY1LW6KMZ1iRhJ5
                        </NavDropdown.Item>
                        <NavDropdown.Item 
                        onClick={() => {
                                navigator.clipboard.writeText("hello.fabrique@protonmail.com")
                        }}>
                        Copy email
                    </NavDropdown.Item>
                    </NavDropdown>
                </Nav>
                <Form 
                    id="search-input"
                    className="d-flex"
                    onClick={(e) => {
                        // console.log(e.target)
                    }}
                    onChange={(e) => {
                        handleChange(e)
                    }}
                    onSubmit={(e) => {
                        handleSubmit(e)
                        e.preventDefault()
                    }}
                >
                <AutoComplete 
                    className="mr-2 search-field"
                    setInput={setInput} 
                    search={search} 
                    input={input} 
                />
                {/* <FormControl
                    type="search"
                    placeholder="Search asset or address"
                    className="mr-2 search-field"
                    aria-label="Search"
                    onChange={(e)=>{
                        handleInput(e.target.value)
                    }}
                /> */}
                <Button 
                    variant="outline-success"
                    className="search-button"
                    onClick={() => {
                        search(input)
                    }}
                >Search</Button>
                </Form>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default NavBar