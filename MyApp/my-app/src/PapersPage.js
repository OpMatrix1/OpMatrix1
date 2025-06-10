import React, { useState, useEffect } from 'react';
import { 
    Container, 
    Paper, 
    Typography, 
    Button, 
    Grid,
    Card,
    CardContent,
    CardActions,
    TextField,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Box
} from '@mui/material';
import axios from 'axios';
import './PapersPage.css';

const PapersPage = () => {
    const [papers, setPapers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourse, setSelectedCourse] = useState('');
    const [uploadForm, setUploadForm] = useState({
        title: '',
        course_code: '',
        year: new Date().getFullYear(),
        semester: 1,
        paper_type: 'exam',
        file: null
    });

    useEffect(() => {
        fetchPapers();
        fetchCourses();
    }, []);

    const fetchPapers = async () => {
        try {
            const response = await axios.get('/api/papers');
            setPapers(response.data.papers);
        } catch (error) {
            console.error('Error fetching papers:', error);
        }
    };

    const fetchCourses = async () => {
        try {
            const response = await axios.get('/api/courses');
            setCourses(response.data.courses);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };

    const handleUpload = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        Object.keys(uploadForm).forEach(key => {
            formData.append(key, uploadForm[key]);
        });

        try {
            await axios.post('/api/papers', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            fetchPapers();
            setUploadForm({
                title: '',
                course_code: '',
                year: new Date().getFullYear(),
                semester: 1,
                paper_type: 'exam',
                file: null
            });
        } catch (error) {
            console.error('Error uploading paper:', error);
        }
    };

    const handleFileChange = (e) => {
        setUploadForm({
            ...uploadForm,
            file: e.target.files[0]
        });
    };

    const handleFormChange = (e) => {
        setUploadForm({
            ...uploadForm,
            [e.target.name]: e.target.value
        });
    };

    return (
        <Container className="papers-container">
            <Typography variant="h4" component="h1" gutterBottom>
                Past Papers Repository
            </Typography>

            {/* Upload Form */}
            <Paper elevation={3} className="upload-form">
                <Typography variant="h6" gutterBottom>
                    Upload New Paper
                </Typography>
                <form onSubmit={handleUpload}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={uploadForm.title}
                                onChange={handleFormChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <FormControl fullWidth>
                                <InputLabel>Course</InputLabel>
                                <Select
                                    name="course_code"
                                    value={uploadForm.course_code}
                                    onChange={handleFormChange}
                                    required
                                >
                                    {courses.map(course => (
                                        <MenuItem key={course.code} value={course.code}>
                                            {course.code} - {course.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <TextField
                                fullWidth
                                type="number"
                                label="Year"
                                name="year"
                                value={uploadForm.year}
                                onChange={handleFormChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Semester</InputLabel>
                                <Select
                                    name="semester"
                                    value={uploadForm.semester}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <MenuItem value={1}>Semester 1</MenuItem>
                                    <MenuItem value={2}>Semester 2</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} sm={4}>
                            <FormControl fullWidth>
                                <InputLabel>Paper Type</InputLabel>
                                <Select
                                    name="paper_type"
                                    value={uploadForm.paper_type}
                                    onChange={handleFormChange}
                                    required
                                >
                                    <MenuItem value="exam">Final Exam</MenuItem>
                                    <MenuItem value="test">Test</MenuItem>
                                    <MenuItem value="assignment">Assignment</MenuItem>
                                </Select>
                            </FormControl>
                        </Grid>
                        <Grid item xs={12}>
                            <input
                                accept="application/pdf"
                                type="file"
                                onChange={handleFileChange}
                                required
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Button
                                variant="contained"
                                color="primary"
                                type="submit"
                                fullWidth
                            >
                                Upload Paper
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>

            {/* Papers List */}
            <Box mt={4}>
                <Grid container spacing={3}>
                    {papers.map(paper => (
                        <Grid item xs={12} sm={6} md={4} key={paper.id}>
                            <Card>
                                <CardContent>
                                    <Typography variant="h6" component="h2">
                                        {paper.title}
                                    </Typography>
                                    <Typography color="textSecondary">
                                        {paper.course_code}
                                    </Typography>
                                    <Typography variant="body2">
                                        Year: {paper.year} - Semester {paper.semester}
                                    </Typography>
                                    <Typography variant="body2">
                                        Type: {paper.paper_type}
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Button 
                                        size="small" 
                                        color="primary"
                                        href={`/api/papers/download/${paper.id}`}
                                    >
                                        Download
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Container>
    );
};

export default PapersPage;
