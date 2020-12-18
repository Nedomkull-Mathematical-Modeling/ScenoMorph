import toga
from toga.style.pack import COLUMN, LEFT, RIGHT, ROW, Pack, BOTTOM


class ScenoMorph(toga.App):
    actor_inputs = []
    goal_inputs = []
    method_inputs = []
    means_input = []

    def startup(self):
        # Header
        header_label = toga.Label(
            "ScenoMorph", style=Pack(font_size=16, text_align=LEFT)
        )
        underheader = toga.Label(
            " Scenario modelling with morphological analysis",
            style=Pack(font_size=8, text_align=LEFT, color="#303030"),
        )
        header_box = toga.Box(
            children=[header_label, underheader],
            style=Pack(direction=COLUMN, padding_bottom=10),
        )

        # Middle

        actors_label = toga.Label("Actors", style=Pack(font_size=12, text_align=LEFT))
        add_actor_button = toga.Button(
            "Add Actor",
            style=Pack(padding=10, alignment="center"),
        )
        actor_box = toga.Box(id="actor_box",
            children=[actors_label, add_actor_button], style=Pack(direction=COLUMN)
        )

        goals_label = toga.Label("Goals", style=Pack(font_size=12, text_align=LEFT))
        add_goal_button = toga.Button(
            "Add Goal", style=Pack(padding=10, alignment="center")
        )
        goal_box = toga.Box(
            children=[goals_label, add_goal_button],
            style=Pack(direction=COLUMN, padding_top=10),
        )

        methods_label = toga.Label("Methods", style=Pack(font_size=12, text_align=LEFT))
        add_method_button = toga.Button(
            "Add Method",
            style=Pack(padding=10, alignment="center"),
        )
        method_box = toga.Box(
            children=[methods_label, add_method_button],
            style=Pack(direction=COLUMN, padding_top=10),
        )

        means_label = toga.Label("Means", style=Pack(font_size=12, text_align=LEFT))
        add_means_button = toga.Button(
            "Add Means",
            style=Pack(padding=10, alignment="center"),
        )
        means_box = toga.Box(
            children=[means_label, add_means_button],
            style=Pack(direction=COLUMN, padding_top=10),
        )

        left_container = toga.ScrollContainer(
            content=toga.Box(
                children=[actor_box, goal_box, method_box, means_box],
                style=Pack(direction=COLUMN),
            ),
            #style=Pack(width=500)
        )
        right_container = toga.ScrollContainer(
            content=toga.Box(
                children=[toga.Label("fdsdgfdesgfdgfdsgfdsgfd", style=Pack(font_size=12, text_align=LEFT))],
                style=Pack(direction=COLUMN),
            ),
            #style=Pack(width=500)
        )
        split = toga.SplitContainer(content=[(left_container,500,True), (right_container,500,True)], style=Pack(width=1000))
        split_box = toga.Box(children=[split,], style=Pack(width=1000))

        # Footer
        button = toga.Button(
            "Next",
            style=Pack(
                padding_top=10,
                padding_bottom=10,
                alignment="center",
                background_color="green",
            ),
        )
        footer_box = toga.Box(
            children=[button], style=Pack(direction=COLUMN)
        )

        outer_box = toga.Box(
            children=[
                header_box,
                split_box,
                footer_box,
            ],
            style=Pack(direction=COLUMN),
        )

        def add_actor(widget):
            self.actor_inputs.append(
                toga.TextInput(
                    f"actor_{len(self.actor_inputs)}",
                    style=Pack(
                        padding_left=10,
                        padding_right=10,
                        padding_top=2,
                        padding_bottom=2,
                    ),
                )
            )
            actor_box.add(self.actor_inputs[-1])

        def add_goal(widget):
            self.goal_inputs.append(
                toga.TextInput(
                    f"goal_{len(self.goal_inputs)}",
                    style=Pack(
                        padding_left=10,
                        padding_right=10,
                        padding_top=2,
                        padding_bottom=2,
                    ),
                )
            )
            goal_box.add(self.goal_inputs[-1])

        def add_method(widget):
            self.method_inputs.append(
                toga.TextInput(
                    f"method_{len(self.method_inputs)}",
                    style=Pack(
                        padding_left=10,
                        padding_right=10,
                        padding_top=2,
                        padding_bottom=2,
                    ),
                )
            )
            method_box.add(self.method_inputs[-1])

        def add_means(widget):
            self.means_input.append(
                toga.TextInput(
                    f"means_{len(self.means_input)}",
                    style=Pack(
                        padding_left=10,
                        padding_right=10,
                        padding_top=2,
                        padding_bottom=2,
                    ),
                )
            )
            means_box.add(self.means_input[-1])

        def on_next(widget):

            # for child in self.scroll_container.content.children:
            #     print("C: " + str(child))
            #     if child.can_have_children:
            #         for inner_child in child.children:
            #             print("CI: " + str(inner_child))
            #             child.remove(inner_child)
            #
            # self.scroll_container.content.remove(actor_box)
            # self.scroll_container.content.remove(goal_box)
            # self.scroll_container.content.remove(method_box)
            # self.scroll_container.content.remove(means_box)
            print("Next!")

        add_actor_button.on_press = add_actor
        add_goal_button.on_press = add_goal
        add_method_button.on_press = add_method
        add_means_button.on_press = add_means
        button.on_press = on_next

        self.main_window = toga.Window(size=(1000, 600), resizeable=True)
        self.main_window.content = outer_box

        self.main_window.show()

    def transition_from_first_to_second(self, *args):

        # TODO: Add validation

        actors = [x.value for x in self.actor_inputs]
        goals = [x.value for x in self.goal_inputs]
        methods = [x.value for x in self.method_inputs]
        means = [x.value for x in self.means_input]


        print("Transition!")


def main():
    return ScenoMorph("Scenomorph", "org.nedomkull.scenomorph")


if __name__ == "__main__":
    app = main()
    app.main_loop()
