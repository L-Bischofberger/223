// Konfiguriert Jest, um die Testumgebung einzurichten und Dateien entsprechend zu transformieren
module.exports = {
  // Dateien, die nach der Testumgebung geladen werden sollen
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.js'],
  // Spezifiziert die Testumgebung für Jest
  testEnvironment: 'jest-environment-jsdom',
  // Transformationsregeln für Dateien, die Jest verwenden soll
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  // Legt die Dateierweiterungen fest, die Jest erkennen soll
  moduleFileExtensions: ['js', 'jsx'],
  // Mapping von Modulnamen für Dateitypen, die von Jest ignoriert werden sollen
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  // Muster für Testdateien, die Jest erkennen soll
  testMatch: ['<rootDir>/src/**/*.test.{js,jsx}'],
};
