const filterRules = {
  Пенсионеры: (request) => request.requesterType === "person",
  "Дома престарелых": (request) => request.requesterType === "organization",
  Вещи: (request) => request.helpType === "material",
  Финансирование: (request) => request.helpType === "finance",
  Квалифицированная: (request) =>
    request.helperRequirements.qualification === "professional",
  "Не требует профессии": (request) =>
    request.helperRequirements.qualification === "common",
  Онлайн: (request) => request.helperRequirements.isOnline === "true",
  Офлайн: (request) => request.helperRequirements.isOnline === "false",
  Группа: (request) => request.helperRequirements.helperType === "group",
  Один: (request) => request.helperRequirements.helperType === "single",
};

export default filterRules;
