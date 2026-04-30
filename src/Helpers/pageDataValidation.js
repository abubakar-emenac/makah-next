function hasWidgets(section) {
  return Array.isArray(section) && section.length > 0;
}

function hasTypedWidgets(section, key) {
  return Array.isArray(section) && section.some((item) => item && item[key]);
}

export function isRenderableSlugPage(pageData) {
  if (!pageData || typeof pageData !== "object") return false;

  const section1 = pageData.section_1_widget || [];
  const section2 = pageData.section_2_widget || [];
  const section3 = pageData.section_3_widget || [];

  const hasSection1 = hasWidgets(section1);
  const hasSection2 = hasWidgets(section2);
  const hasSection3 = hasWidgets(section3);

  const hasHajjSection1 = hasTypedWidgets(section1, "hajj_type");
  const hasHajjSection2 = hasTypedWidgets(section2, "hajj_type");
  const hasHajj = hasHajjSection1 || hasHajjSection2 || hasTypedWidgets(section3, "hajj_type");

  const hasUmrah = hasTypedWidgets(section1, "umrah_type") || hasTypedWidgets(section2, "umrah_type") || hasTypedWidgets(section3, "umrah_type");

  if (hasHajj) {
    return hasHajjSection1 || hasHajjSection2;
  }

  if (hasUmrah) {
    return (
      (hasSection1 && hasSection2 && hasSection3) ||
      (hasSection1 && hasSection2) ||
      (hasSection2 && hasSection3) ||
      (hasSection1 && !hasSection2 && !hasSection3)
    );
  }

  return false;
}
