import React, { useState } from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton, IonCard, IonCardContent, IonGrid, IonRow, IonCol, IonModal } from '@ionic/react';
import './Home.css';

const Home: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [consoleLogs, setConsoleLogs] = useState<{ location: string; event: string; }[]>([]);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const sendReport = (eventType: string) => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      const mapsLink = `https://www.google.com/maps?q=${latitude},${longitude}`;

      const event = eventType === 'pothole' ? 'Pothole' :
                   eventType === 'water' ? 'Water Leakage' :
                   eventType === 'garbage' ? 'Garbage Spill' : '';

      if (event) {
        setConsoleLogs(prevLogs => [{ location: mapsLink, event }, ...prevLogs]);
      }

      window.open(`mailto:kshitijmahajan.ngp@gmail.com?subject=${event} Report&body=I found a ${event} at this Location: ${mapsLink}`);
      alert(`Thank you for reporting the ${event.toLowerCase()}!`);

      const logMessage = `${event} reported.`;
      console.log(logMessage);
    });
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar className='tool'>
          
          <IonTitle className='tit'><img className='titimg' src="/images/UA1.png" alt="Logo" /></IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent className="ion-padding custombg">
        <div className='fontbg'>
          <h1 className='font fontbg'><span className='fontbg'>Welcome to Urban Alert!</span></h1>
        </div>
        <div>
          <p className='font1'>Help us keep the streets safe by reporting any issues you find.</p>
        </div>
        <IonGrid>
          <IonRow>
            <IonCol size="12" size-md="4">
              <IonButton className="tile-button pot" expand="block" onClick={() => sendReport('pothole')}>Report Pothole</IonButton>
            </IonCol>
            <IonCol size="12" size-md="4">
              <IonButton className="tile-button" expand="block" onClick={() => sendReport('water')}>Report Water Leakage</IonButton>
            </IonCol>
            <IonCol size="12" size-md="4">
              <IonButton className="tile-button" expand="block" onClick={() => sendReport('garbage')}>Report Garbage</IonButton>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonButton className='rep' expand="block" onClick={openModal}>Latest Reports</IonButton> 
        <IonModal isOpen={isModalOpen}>
          <IonHeader>
            <IonToolbar>
              <IonTitle>Latest Reports
                <button onClick={closeModal} className='clo'>Close</button>
              </IonTitle>
            </IonToolbar>
          </IonHeader>
          <IonContent>
            {consoleLogs.slice(0).map((log, index) => (
              <IonCard key={index}>
                <IonCardContent>
                  <p>Event: {log.event} Reported</p>
                  <p>Location: <a href={log.location} target="_blank" rel="noopener noreferrer">{log.location}</a></p>
                </IonCardContent>
              </IonCard>
            ))}
            
          </IonContent>
        </IonModal>
      </IonContent>
    </IonPage>
  );
};

export default Home;
