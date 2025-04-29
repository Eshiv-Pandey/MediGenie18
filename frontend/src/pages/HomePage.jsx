import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import AuthContext from '../context/AuthContext';
import ConditionSelector from '../components/ConditionSelector';
import HomeRemedyList from '../components/HomeRemedyList';
import ExerciseList from '../components/ExerciseList';
import NutritionList from '../components/NutritionList';
import VideoPlayer from '../components/VideoPlayer';


const HomePage = () => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [conditions, setConditions] = useState([]);
  const [selectedCondition, setSelectedCondition] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/conditions');
        setConditions(response.data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    fetchConditions();
  }, []);

  const handleConditionChange = async (conditionName) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/conditions/${conditionName}`);
      setSelectedCondition(response.data);
    } catch (err) {
      setError(err.message);
    }
  };

  const requireAuthForAction = (actionCallback) => {
    return () => {
      if (!user) {
        if (window.confirm('Please login to access this feature. Go to login page now?')) {
          navigate('/login');
        }
      } else {
        actionCallback();
      }
    };
  };

  const handleSaveFavorite = (contentType, contentId) => {
    console.log(`Saving ${contentType} with ID ${contentId} to favorites`);
    // API implementation would go here
  };

  if (loading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">Error: {error}</div>;

  return (
    <div className="container" id="papa">
      <header>
        <h1 className="glitch-text" data-text="Health Information Portal">Health Information Portal</h1>
        <p>Find home remedies, exercises, nutrition advice, and educational videos for various health conditions</p>
        {user && <p className="welcome-message">Welcome back, {user.username}!</p>}
      </header>
      
      <ConditionSelector 
        conditions={conditions} 
        onConditionChange={handleConditionChange} 
      />
      
      {selectedCondition && (
        <div className="condition-info">
          <h2>{selectedCondition.name}</h2>
          {selectedCondition.description && (
            <p className="condition-description">{selectedCondition.description}</p>
          )}
          
          <div className="info-sections">
            <section className="info-section">
              <h3><i className="icon remedy-icon"></i> Home Remedies</h3>
              <HomeRemedyList 
                remedies={selectedCondition.homeRemedies} 
                onSaveFavorite={requireAuthForAction(
                  (remedyId) => handleSaveFavorite('remedy', remedyId)
                )} 
              />
            </section>
            
            <section className="info-section">
              <h3><i className="icon exercise-icon"></i> Exercises</h3>
              <ExerciseList 
                exercises={selectedCondition.exercises} 
                onSaveFavorite={requireAuthForAction(
                  (exerciseId) => handleSaveFavorite('exercise', exerciseId)
                )}
              />
            </section>
            
            <section className="info-section">
              <h3><i className="icon nutrition-icon"></i> Nutrition</h3>
              <NutritionList 
                nutrition={selectedCondition.nutrition} 
                onSaveFavorite={requireAuthForAction(
                  (nutritionId) => handleSaveFavorite('nutrition', nutritionId)
                )}
              />
            </section>

            {selectedCondition.videos && selectedCondition.videos.length > 0 && (
              <section className="info-section">
                <h3><i className="icon video-icon"></i> Educational Videos</h3>
                <VideoPlayer 
                  videos={selectedCondition.videos} 
                  onSaveFavorite={requireAuthForAction(
                    (videoId) => handleSaveFavorite('video', videoId)
                  )}
                />
              </section>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;