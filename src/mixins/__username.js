export default {
	methods: {
		__convertUserName(cn) {
			if (cn) {
				cn = cn.replace(/(^\s*)|(\s*$)/, "");
			}

			return cn
				? cn.length > 2
					? `${cn[cn.length - 2]}${cn[cn.length - 1]}`
					: cn
				: "";
		},
		__isEmptyAvatar(imgPath) {
			return (
				!imgPath ||
				~imgPath.indexOf("/avatar_male.png?") ||
				~imgPath.indexOf("/avatar_female.png?")
			);
		}
	}
};
