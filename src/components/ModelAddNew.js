import { useState } from "react";
import { Button } from "react-bootstrap"
import { Modal, Form } from "react-bootstrap"
import { postCreateUser } from "../services/UserService";
import { toast } from "react-toastify";

const ModelAddNew = (props) => {
    const { show, handleClose, handleUpdateUser } = props;
    const [name, setName] = useState("")
    const [job, setJob] = useState("")
    const handleSaveUser = async () => {
        let res = await postCreateUser(name, job)
        console.log(res);
        if (res && res.id) {
            handleClose()
            setName("")
            setJob("")
            toast.success("Create user success")
            handleUpdateUser({ first_name: name, id: res.id })
        }
        else {
            setName("")
            setJob("")
            toast.err("Error happened")
        }
    }
    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Add new user</Modal.Title>
                </Modal.Header>
                <Modal.Body className="body-add=new">
                    <Form>
                        <Form.Group className="mb-3"  >
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3"  >
                            <Form.Label>Job</Form.Label>
                            <Form.Control
                                type="text"
                                value={job}
                                onChange={(event) => setJob(event.target.value)}
                            />
                        </Form.Group>
                    </Form>

                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={handleSaveUser}>
                        Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}

export default ModelAddNew