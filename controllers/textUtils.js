function ensurePeriod(paragraph) {
    const trimmedText = paragraph.replace(/\.\s*$/, '');
    
    return trimmedText + '.\n\n';
}

module.exports = { ensurePeriod };