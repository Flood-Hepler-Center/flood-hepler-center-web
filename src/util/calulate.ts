export const getWaterLevel = (value: number) => {
  if (value < 70) {
    return {
      level: 'low',
      text: 'ไม่วิกฤต'
    }
  }

  if (value > 70 && value < 100) {
    return {
      level: 'medium',
      text: 'เริ่มวิกฤต'
    }
  }

  if (value > 100) {
    return {
      level: 'high',
      text: 'วิกฤต'
    }
  }
}