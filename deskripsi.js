// Fungsi untuk mendekripsi ciphertext menjadi plaintext menggunakan Hill Cipher
function hillCipherDecrypt(ciphertext, keyMatrix) {
    function charToNumber(char) {
      return char.charCodeAt(0) - 'A'.charCodeAt(0);
    }
  
    function numberToChar(number) {
      return String.fromCharCode(number + 'A'.charCodeAt(0));
    }
  
    function modInverse(a, m) {
      a = (a % m + m) % m;
      for (let i = 1; i < m; i++) {
        if ((a * i) % m === 1) {
          return i;
        }
      }
      return 1;
    }
  
    function modDet(matrix) {
      return (
        matrix[0] * (matrix[4] * matrix[8] - matrix[5] * matrix[7]) -
        matrix[1] * (matrix[3] * matrix[8] - matrix[5] * matrix[6]) +
        matrix[2] * (matrix[3] * matrix[7] - matrix[4] * matrix[6])
      );
    }
  
    function modAdjoint(matrix) {
      const result = [];
      const cofactors = [1, -1, 1, -1, 1, -1, 1, -1, 1];
  
      for (let i = 0; i < 9; i++) {
        const minorMatrix = [
          matrix[(i + 1) % 3][(i + 2) % 3],
          matrix[(i + 1) % 3][(i + 3) % 3],
          matrix[(i + 1) % 3][(i + 4) % 3],
        ];
        result.push(cofactors[i] * modDet(minorMatrix));
      }
  
      return [
        result[0], result[3], result[6],
        result[1], result[4], result[7],
        result[2], result[5], result[8],
      ];
    }
  
    const keyMatrixInverse = modAdjoint(keyMatrix);
    const det = modDet(keyMatrix);
    const detInverse = modInverse(det, 26);
  
    function decryptBlock(block, keyMatrixInverse, detInverse) {
      const blockSize = 3;
      const result = [];
  
      for (let i = 0; i < blockSize; i++) {
        let sum = 0;
        for (let j = 0; j < blockSize; j++) {
          sum += keyMatrixInverse[i * blockSize + j] * block[j];
        }
        result.push((sum * detInverse) % 26);
      }
  
      return result;
    }
  
    const blockSize = 3;
    const plaintext = [];
  
    for (let i = 0; i < ciphertext.length; i += blockSize) {
      const block = ciphertext.slice(i, i + blockSize).toUpperCase();
      const blockNumbers = block.split('').map(charToNumber);
      const decryptedBlock = decryptBlock(blockNumbers, keyMatrixInverse, detInverse);
      const decryptedChars = decryptedBlock.map(numberToChar);
      plaintext.push(...decryptedChars);
    }
  
    return plaintext.join('');
  }
  
  // Kunci matriks untuk Hill Cipher
  const keyMatrix = [
    [198, 198, 4],
    [6, 6, 198],
    [2, 4, 6],
  ];
  
  // Chipertext
  const chipertext = 'JPZGSKTHFQWCMMKSEAEECIGSQMQ';
  
  // Dekripsi chipertext menggunakan Hill Cipher
  const plaintext = hillCipherDecrypt(chipertext, keyMatrix);
  
  // Hasil
  console.log('Chipertext:', chipertext);
  console.log('Plaintext:', plaintext);
  