import isInClientView from "../../../src/utils/dom/isInClientView";

const lazyImgDirective = {};

const defaultSrc =
	"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAWgAAAEEAgMAAAB4vUZnAAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURebm5ubm5ubm5v///5/9MPAAAAACdFJOUwib2ZcN/AAAAuFJREFUeNrt3Mtx3DAMBmDlkiJcQqpIPa4mRfgQQzPR3Rf1gxJwgJNM1uvdFUDyXxO+5OdR0n4iwYdmoceyPEhJeVqWL1JUvi9fq+gfVfH4G5FvVfTP5bGKfl6krJAmTfoOen+dWvydXl8nFz3T22zazvQ+m/bPoF+nF9KkSZMmTZo0adKkSZMmTfp/p1+Q//IIbVjeBKBPOZ99Pq0neptOv8njERml7T0LNpn2iwTbPpe+zN1tU2m9pNeZtEsZrdfZzIm03yRK93m0lNF2S2/TaCmj/UCvs2gtoz3IpU+itYyOKj04+nq01dFSRoeVHhzYHVrLaI9v5KwTaKujpYz27NbWx2mto6WMtpTeP0prHS0IbYeJ1KDzeETT8XjCBq0Ircfh3qAFoYM45XQjHsfpaMHmnFaEjsZ7TgtAexSolHaEtmh7Smvz1nvWwiFaANrDuZTRjtAWRiqjDaEVojuPOezZwXuXdoR2iDaEtngJSGhF6GTEJ3TvkZItPbhHO0Jb0p6YtvvprUMLQmfLy530ei9tCO3ZRA1pRWjLxmVIC0Jr1g0R7RCd7orofqgvDneIVoS2dFdEC0Jrur4EtEN0Pp0C2hDaIXok1OdWez56AloQ2vIWHWmHaEVog+jGviOtCO2NFfdIjz0UuTWamNFjoX6rtTUWmANtUK0VoRWiW/PpQAtCeytat7RDtCH0YKhP8bTWee+lt1bHrCEtUK2ljG6nYm5oh2hDaJtD7wGtEK0IPf7QdvPo7Ug7RHu7Tde01dEK0dYP1720IrRAdOdKcUV7HQ304p8fe2f1uqIVog2hBaJ7yalPoh2jR3p56U+BgHaE1on0fk0LRNswvYP0pp3L8uU7HI7RMkxvWC/26PUfd3oVB+pF+dWj9UzLLlPLxQtENYU0adKkSZMmTZo0adKkSZMmTZo0adKkSZMmTZo0adKkSZMm/Tn0Y5X8XPnh5Icq+qnyI9WFn9au+yD4byAKqB9739nwAAAAAElFTkSuQmCC";
// "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAPAAAAC0AgMAAADX8kl7AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAAAMUExURe7u7tHR0dra2uXl5WkTe1MAAAH8SURBVGje7Zc7bttAEEBHXLhgsVYl5QTrIv0aSKo9ggsNxShbsEkZgAdwQeQMJBzDadUoKdK4CGAgvICRRozukCpADiDP0nKUMjONm3kARTZPy53PagSgKIqiKIqiKIqiKMrz8GtDdKv0uem5codHGq5cfN+PC073+zVfPj56tozF5sCa/9rDccsFO2CniN0aMQ45VvxcdeXcIPYuw54vz+otvP4C/t/Q/Te+2Y43WEhk2KXbHFqJ3M/T7Uq0susd5TdbmKVAngVfAryKFgUyVjneTbE6eccuMMhWcZLKK/j7wJZt3Zok925S8+XQpvpegkiuW/BU2+C/8eXJqgSLWEPO70gweEEXpWkiSdVAC7q39CAqz3RFamxJV3UUp45K06EgYFhSrDDATHCSHOSa8sVf2dBrZ+nsyyRddZYiTn11KpEHOvc8bdeLiqR+XNlhEJRnqjDK8dxKGiOCfX/7VSTn4RP4+w9RvPKNbX6CuxXtOatsOGm84OeGom2bvKYvEDVG48FFEzPRoQ8vTFf0H00UyOewdXSG7UTyGbQ0ES13phTJ40xxlZWixhjlpRUELMMwznELL0iVx2qU44CX/DRj8XeCZJdYkmh+k82eePf0NB348p/fB/cHX6YNj8O26LVf0qiOb66vyf+sf10URVEURVEURVEU5Zl4AAnlrXlZ58nhAAAAAElFTkSuQmCC";
// "data:image/gif;base64,R0lGODdhAQABAPAAAMPDwwAAACwAAAAAAQABAAACAkQBADs=";
const propKey = "data-src";

lazyImgDirective.install = Vue => {
	Vue.directive("lazyimg", {
		bind(el, binding) {
			// 初始化默认图
			if (el.hasAttribute(propKey) && !el.hasAttribute("src")) {
				el.setAttribute("src", defaultSrc);
			}
		},
		inserted(el) {
			if (!el.hasAttribute(propKey)) return false;
			setTimeout(() => {
				if (isInClientView(el)) {
					const dataSrc = el.getAttribute(propKey);
					el.setAttribute("src", dataSrc);
					el.removeAttribute(propKey);
					el.__lazy = true;
				}
			}, 300);
		}
	});
};

export default lazyImgDirective;
