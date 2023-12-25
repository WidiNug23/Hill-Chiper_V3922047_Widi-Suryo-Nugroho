// Fungsi untuk mengenkripsi plaintext menjadi ciphertext menggunakan Hill Cipher
function hillCipherEncrypt(plaintext, keyMatrix) {
    // Fungsi untuk mengonversi huruf ke angka (A=0, B=1, ..., Z=25)
    function charToNumber(char) {
      return char.charCodeAt(0) - 'A'.charCodeAt(0);
    }
  
    // Fungsi untuk mengonversi angka ke huruf
    function numberToChar(number) {
      return String.fromCharCode(number + 'A'.charCodeAt(0));
    }
  
    // Fungsi untuk mengenkripsi satu blok teks
    function encryptBlock(block, keyMatrix) {
      const blockSize = keyMatrix.length;
      const result = [];
  
      for (let i = 0; i < blockSize; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += keyMatrix[i][j] * block[j];
        }
        result.push(sum % 26);
      }
  
      return result;
    }
  
    // Memproses teks dengan ukuran blok sesuai dengan matriks kunci
    const blockSize = keyMatrix.length;
    const ciphertext = [];
  
    for (let i = 0; i < plaintext.length; i += blockSize) {
      const block = plaintext.slice(i, i + blockSize).toUpperCase();
      const blockNumbers = block.split('').map(charToNumber);
      const encryptedBlock = encryptBlock(blockNumbers, keyMatrix);
      const encryptedChars = encryptedBlock.map(numberToChar);
      ciphertext.push(...encryptedChars);
    }
  
    return ciphertext.join('');
  }
  
  // Kunci matriks untuk Hill Cipher
  const keyMatrix = [
    [22, 8, 3],
    [18, 20, 17],
    [24, 14, 13],
  ];
  
  // Plaintext
  const plaintext = 'HAVEFUNSTUDYINGCRYPTOGRAPHY';
  
  // Enkripsi plaintext menggunakan Hill Cipher
  const ciphertext = hillCipherEncrypt(plaintext, keyMatrix);
  
  // Hasil
  console.log('Plaintext:', plaintext);
  console.log('Ciphertext:', ciphertext);
  