// TODO: types
export const createInitialValues = (item: any) => item !== null
  ? {
      ...item,
      required_skills: item.required_skills.map((node: any) => node.id),
      good_to_have_skills: item.good_to_have_skills.map((node: any) => node.id),
    }
  : {
      title: "",
      content: "",
      url: "",
      company: "",
    }
