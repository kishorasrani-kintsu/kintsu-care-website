tailwind.config = {
  theme: {
    extend: {
      fontFamily: { sans: ['Plus Jakarta Sans', 'sans-serif'] },
      colors: {
        navy: { DEFAULT: '#0B1D3A', light: '#17345F', dark: '#07142A' },
        care: { DEFAULT: '#00A7A0', light: '#DDF7F5', dark: '#007E79' },
        violet: { DEFAULT: '#7A3DB8', light: '#EEE6F8', dark: '#5D2992' },
        purple: { DEFAULT: '#8A1F7A', light: '#F5E4F1', dark: '#68155C' },
        slate: { DEFAULT: '#5B6475', light: '#E8EBF0', dark: '#3E4655' },
        gold: { DEFAULT: '#C6971F', light: '#F7E9C6', dark: '#8F6A12' },
        mist: '#F6F8FC'
      },
      boxShadow: { soft: '0 18px 50px rgba(11,29,58,.10)', card: '0 10px 30px rgba(11,29,58,.08)' }
    }
  }
};
