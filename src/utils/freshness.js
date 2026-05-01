export const getFreshness = (harvestDate) => {
  const harvest = new Date(harvestDate);
  const now = new Date();
  const diffTime = Math.abs(now - harvest);
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));

  if (diffDays === 0) {
    return { label: 'Harvested Today', color: 'bg-green-100 text-green-700 border-green-200' };
  } else if (diffDays <= 2) {
    return { label: `Harvested ${diffDays} day${diffDays > 1 ? 's' : ''} ago`, color: 'bg-yellow-100 text-yellow-700 border-yellow-200' };
  } else {
    return { label: 'Older Stock', color: 'bg-red-100 text-red-700 border-red-200' };
  }
};
