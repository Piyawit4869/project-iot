import { useNavigate } from 'react-router-dom';

export const ProjectSingle = () => {
    const navigate = useNavigate();
  
    const handleNavigateHome = () => {
        navigate('/home');
    };

    const handleNavigateProjects = () => {
        navigate('/projects');
    };

    return (
        <div>
            <h1>แก้ไขโครงการ</h1>
            <button onClick={handleNavigateHome}>Go to Home</button>
            <button onClick={handleNavigateProjects}>Go to Projects</button>
        </div>
    );
};
