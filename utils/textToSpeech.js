import EasySpeech from 'easy-speech';

// Initialize EasySpeech
const initializeSpeech = async () => {
  try {
    await EasySpeech.init({ maxTimeout: 5000, interval: 250 });
    console.debug('EasySpeech initialized');
  } catch (error) {
    console.error('Error initializing EasySpeech:', error);
  }
};

// Function to convert text to speech
export const speakText = async (text) => {
    return new Promise((resolve, reject) => {
      try {
        // Use EasySpeech API to generate speech
        EasySpeech.speak({
          text,
          pitch: 1,
          rate: 1,
          volume: 1,
          boundary: (e) => console.debug('Boundary reached:', e),
          onstart: () => {
            // Use a separate method to get the audio URL
            const audioURL = EasySpeech.getAudioURL(text); // Ensure this method is correct
            if (audioURL) {
              resolve(audioURL);
            } else {
              reject('Error: Audio URL not available.');
            }
            
          },
          onerror: (error) => reject('Error synthesizing speech: ' + error.message)
        });
        
      } catch (error) {
        reject('Error in speakText function: ' + error.message);
      }
    });
  };

initializeSpeech();
